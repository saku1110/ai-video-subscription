import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Download, Star, Zap, Shield, Clock } from 'lucide-react'
import { VideoGrid } from '../components/Video/VideoGrid'
import { useAuth } from '../contexts/AuthContext'

const features = [
  {
    icon: Play,
    title: 'Veo2/Veo3 AI技術',
    description: 'Google最新AI技術による実写品質の広告動画。CVR向上に特化した制作',
  },
  {
    icon: Download,
    title: '即座納品',
    description: '最短24時間で4K品質の広告動画を納品。修正回数無制限対応',
  },
  {
    icon: Shield,
    title: '完全商用ライセンス',
    description: '著作権フリー・商用利用無制限。広告配信・SNS投稿も安心',
  },
  {
    icon: Clock,
    title: 'A/Bテスト対応',
    description: 'パターン違いの広告動画を複数制作。効果測定で最適化',
  },
]

export function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm mb-8">
              <span className="text-sm font-medium text-purple-200">🚀 世界最高峰AI技術 Veo2/Veo3</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                AdStudio AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent text-4xl md:text-6xl">
                AI広告動画制作
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">Veo2/Veo3 AI技術</span>による
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">高品質広告動画</span>を
              <br className="hidden md:block" />
              <span className="text-blue-300 font-bold">月額¥49,800〜</span>で制作・提供
            </p>
            
            {/* Premium CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <span className="relative z-10">🎯 3日間無料トライアル開始</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    💎 料金プランを見る
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  🚀 ダッシュボードへ
                </Link>
              )}
            </div>

            {/* Premium Features Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-white font-medium">3日間無料トライアル</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">4K品質・商用利用可</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">完全著作権フリー</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              業界をリードする実績
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              競合を圧倒する数字で証明された信頼性
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-blue-600 mb-2">300+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">月間生産本数</div>
              <div className="text-sm text-gray-500">競合の3倍</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-purple-600 mb-2">4K</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">画質品質</div>
              <div className="text-sm text-gray-500">最高解像度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">稼働率</div>
              <div className="text-sm text-gray-500">安定サービス</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-orange-600 mb-2">1/2</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">競合比価格</div>
              <div className="text-sm text-gray-500">圧倒的コスパ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-float-fast animation-delay-2000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-slow animation-delay-4000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full blur-2xl animate-float-fast"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">✨ プレミアム機能</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              なぜ<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AdStudio AI</span>が選ばれるのか
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              業界最高峰の<span className="font-bold text-blue-600">Veo2/Veo3 AI技術</span>による広告特化制作で、
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">CVR2倍向上を実現</span>する高品質広告動画
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative text-center p-8 rounded-3xl glass-card hover-lift"
              >
                {/* Premium background effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-3xl mb-6 shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 group-hover:scale-110">
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Floating accent */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Samples */}
      <div className="relative py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🎬 サンプル動画</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">広告動画サンプル</span>を体験
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-blue-600">CVR向上</span>に特化したAI広告動画を
              <br className="hidden md:block" />
              美容・ダイエット・ライフスタイル等の業界別でご提供
            </p>
          </div>
        </div>
        
        <div className="relative">
          <VideoGrid />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-300/10 to-orange-300/10 rounded-full blur-2xl animate-float-fast animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">⭐ お客様の声</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">圧倒的満足度</span>を実現
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              業界をリードする品質と価格で、多くのクリエイターから信頼をいただいています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "田中 美咲",
                role: "デジタル広告代理店 CEO",
                avatar: "👩‍💼",
                content: "AdStudio AIの広告動画でCVRが平均2.3倍向上しました。クライアントのROAS改善に直結し、案件獲得も増加。もう手放せません。",
                rating: 5
              },
              {
                name: "佐藤 健太",
                role: "D2Cブランド マーケティング責任者",
                avatar: "👨‍💼",
                content: "従来の動画制作会社と比べて1/3のコストで高品質な広告動画を量産。A/Bテスト用のバリエーション制作も簡単で、PDCAが回しやすい。",
                rating: 5
              },
              {
                name: "山田 りさ",
                role: "美容ブランド SNS運用担当",
                avatar: "👩‍🎨",
                content: "Instagram・TikTok広告の成果が劇的に改善。特に美容系の広告動画のクオリティが高く、ターゲット層への訴求力が段違いです。",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl glass-card hover-lift"
              >
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/10 via-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">⭐</span>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>

                {/* Floating accent */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 backdrop-blur-sm mb-8">
            <span className="text-yellow-300 font-medium">🚀 限定ローンチキャンペーン実施中</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              今すぐ始めて
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              競合を圧倒しよう
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <span className="text-white font-semibold">3日間の無料トライアル</span>で、すべての機能をお試しいただけます
            <br className="hidden md:block" />
            <span className="text-blue-300">今すぐ動画制作の未来を体験</span>
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl font-black text-xl text-white shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <span className="relative z-10">🎯 無料トライアル開始</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              </Link>
              <Link
                to="/custom-order"
                className="px-12 py-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                ✨ オーダーメイド依頼
              </Link>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <span>💳 クレジットカード不要</span>
            <span>•</span>
            <span>⚡ 即座開始</span>
            <span>•</span>
            <span>🛡️ いつでもキャンセル可能</span>
          </div>
        </div>
      </div>
    </div>
  )
}