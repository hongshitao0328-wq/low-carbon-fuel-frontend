import { useState } from 'react';
import { MessageSquare, Send, Paperclip, Plus, Bot, User as UserIcon } from 'lucide-react';

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

  // API base URL: local dev can set VITE_API_BASE_URL; otherwise use your Aliyun backend
  



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

  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    if (!text) return;

    // 1) 先加入用户消息
    const userMessage: Message = {
      id: Date.now(), // 用时间戳做 id，更稳
      type: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // 2) 加一个“思考中”占位消息（先显示出来）
    const thinkingId = userMessage.id + 1;
    const thinkingMessage: Message = {
      id: thinkingId,
      type: 'ai',
      content: '🤖 Thinking... / 正在思考中...',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      // 3) 把当前对话历史组织成 LLM 常用 messages 结构
      //    这里我们把你 UI 的 messages 转成 {role, content}
      const payloadMessages = [
        {
          role: 'system',
          content:
            'You are a marine fuel price assistant. Answer bilingually (English/Chinese) when appropriate.',
        },
        // 注意：这里用的是 state 里的 messages（可能不含刚刚 setMessages 的最新值），
        // 但我们会手动把本次 user text 再追加一遍，所以不会丢。
        ...messages
          .filter((m) => m.type === 'user' || m.type === 'ai')
          .map((m) => ({
            role: m.type === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        { role: 'user', content: text },
      ];

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });


      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || `HTTP ${resp.status}`);
      }

      const data = await resp.json();

      const answerText =
        data?.content ??
        data?.reply ??
        data?.message?.content ??
        data?.choices?.[0]?.message?.content ??
        'No response / 无返回内容';

      const aiMessage: Message = {
        id: thinkingId, // 用同一个 id 覆盖“thinking”
        type: 'ai',
        content: answerText,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      // 4) 用真实回答替换 thinkingMessage
      setMessages((prev) => prev.map((m) => (m.id === thinkingId ? aiMessage : m)));
    } catch (e: any) {
      const failMessage: Message = {
        id: thinkingId,
        type: 'ai',
        content: `❌ API 调用失败：${String(e?.message ?? e)}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => prev.map((m) => (m.id === thinkingId ? failMessage : m)));
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

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question... / 输入您的问题..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
