import { useEffect, useRef, useState } from 'react';
import { Send, Paperclip, Plus, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: `👋 Hello! I'm your marine fuel price assistant. / 你好！我是您的船用燃料价格助手。

I can help you with: / 我可以帮助您：
• Real-time price queries / 实时价格查询
• Price predictions / 价格预测
• Fuel comparisons / 燃料对比
• Cost analysis / 成本分析

What would you like to know? / 您想了解什么？`,
      timestamp: '10:30 AM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // ✅ 固定 API（你已上线域名）
  const API_BASE = 'https://api.fayevalentine.dpdns.org';

  // ✅ 硬锁：彻底防止“瞬间双触发”
  const sendingRef = useRef(false);

  // ✅ 输入法 composing 保护（比 nativeEvent.isComposing 更稳）
  const isComposingRef = useRef(false);

  // ✅ 维护最新 messages，避免闭包拿到旧 state
  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // ✅ 可选：允许取消上一次请求（如果你想“新消息取消旧请求”，打开注释）
  const abortRef = useRef<AbortController | null>(null);

  // ✅ 去重阀门：同一文本在 400ms 内只发一次（防抖/误触/连按 Enter）
  const lastSendRef = useRef<{ text: string; t: number } | null>(null);

  const suggestedQuestions = [
    { en: "Check today's prices", zh: '查看今日价格' },
    { en: 'Predict next week', zh: '预测下周价格' },
    { en: 'Compare fuels', zh: '燃料对比' },
    { en: 'Cost savings analysis', zh: '成本节省分析' },
  ];

  const conversations = [
    { title: 'Methanol price query', titleZh: '甲醇价格查询', time: '2 hours ago' },
    { title: 'Fuel comparison', titleZh: '燃料对比', time: 'Yesterday' },
    { title: 'Forecast ammonia', titleZh: '预测氨价格', time: '3 days ago' },
  ];

  const nowHM = () =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    if (!text) return;

    // ✅ 输入法选词中不发送
    if (isComposingRef.current) return;

    // ✅ 400ms 内相同内容直接丢弃（非常稳）
    const now = Date.now();
    const last = lastSendRef.current;
    if (last && last.text === text && now - last.t < 400) return;
    lastSendRef.current = { text, t: now };

    // ✅ 硬锁：防止同一瞬间被触发两次
    if (sendingRef.current) return;
    sendingRef.current = true;
    setIsSending(true);

    // ✅ 如果你希望“新发送取消旧请求”，打开这两行
    // abortRef.current?.abort();
    // abortRef.current = null;

    // 1) 先加入用户消息
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: nowHM(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // 2) thinking 占位
    const thinkingId = userMessage.id + 1;
    const thinkingMessage: Message = {
      id: thinkingId,
      type: 'ai',
      content: '🤖 Thinking... / 正在思考中...',
      timestamp: nowHM(),
    };

    setMessages((prev) => [...prev, thinkingMessage]);

    // 3) 组织 payloadMessages（使用最新 messagesRef，且过滤掉初始欢迎语）
    const payloadMessages = [
      {
        role: 'system',
        content:
          'You are a marine fuel price assistant. Answer bilingually (English/Chinese) when appropriate.',
      },
      ...messagesRef.current
        .filter((m) => m.id !== 1) // ✅ 不把初始欢迎语传给后端
        .filter((m) => m.type === 'user' || m.type === 'ai')
        .map((m) => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      { role: 'user', content: text },
    ];

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || `HTTP ${resp.status}`);
      }

      const data = await resp.json();

      // ✅ 只取一个字段，不拼接
      const answerText =
        data?.content ??
        data?.reply ??
        data?.message?.content ??
        data?.choices?.[0]?.message?.content ??
        'No response / 无返回内容';

      const aiMessage: Message = {
        id: thinkingId,
        type: 'ai',
        content: answerText,
        timestamp: nowHM(),
      };

      // 用真实回答替换 thinking
      setMessages((prev) => prev.map((m) => (m.id === thinkingId ? aiMessage : m)));
    } catch (e: any) {
      const msg =
        e?.name === 'AbortError'
          ? '❌ 已取消请求（Abort）'
          : `❌ API 调用失败：${String(e?.message ?? e)}`;

      const failMessage: Message = {
        id: thinkingId,
        type: 'ai',
        content: msg,
        timestamp: nowHM(),
      };

      setMessages((prev) => prev.map((m) => (m.id === thinkingId ? failMessage : m)));
    } finally {
      abortRef.current = null;
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  const handleSuggestedQuestion = (question: { en: string; zh: string }) => {
    setInputMessage(`${question.en} / ${question.zh}`);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col">
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left Column - Conversation History */}
          <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Plus className="w-5 h-5" />
                New Chat / 新对话
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm text-gray-600 mb-3 uppercase tracking-wider">
                Conversation History / 对话历史
              </h3>
              <div className="space-y-2">
                {conversations.map((conv, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                  >
                    <p className="text-gray-900 mb-1">{conv.title}</p>
                    <p className="text-sm text-gray-500">{conv.titleZh}</p>
                    <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Active Chat */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-gray-900">AI Assistant: Fuel Price Expert</h2>
                  <p className="text-sm text-gray-500">AI助手：燃料价格专家</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Online / 在线</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-[#1E40AF] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            <div className="px-6 py-3 border-t border-gray-100">
              <div className="flex gap-2 flex-wrap">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {question.en} / {question.zh}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area (方案A：只用 form onSubmit 发送) */}
            <div className="p-4 border-t border-gray-200">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onCompositionStart={() => {
                    isComposingRef.current = true;
                  }}
                  onCompositionEnd={() => {
                    isComposingRef.current = false;
                  }}
                  placeholder="Type your question... / 输入您的问题..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />

                <button
                  type="submit"
                  disabled={isSending}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                    ${
                      isSending
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-[#1E40AF] hover:bg-blue-800 text-white'
                    }
                  `}
                >
                  <span>{isSending ? 'Sending...' : 'Send'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
