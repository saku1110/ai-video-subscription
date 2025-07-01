import React from 'react'
import { Check, Star } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useProfile } from '../../hooks/useProfile'

const plans = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: '¥49,800',
    period: '/ 月',
    downloads: '30本',
    features: [
      '月30本まで動画ダウンロード',
      '全カテゴリーアクセス',
      '4K画質 (2160p)',
      '商用利用可能',
      'Eメールサポート',
      '基本ウォーターマーク除去',
      '※最低契約期間3ヵ月',
    ],
  },
  {
    id: 'standard',
    name: 'スタンダード',
    price: '¥98,000',
    period: '/ 月',
    downloads: '100本',
    popular: true,
    features: [
      '月100本まで動画ダウンロード',
      '全カテゴリーアクセス',
      '4K画質 (2160p)',
      '商用利用可能',
      '優先サポート',
      'API アクセス',
      '新作動画の優先アクセス',
      'カスタムウォーターマーク',
      '※最低契約期間3ヵ月',
    ],
  },
  {
    id: 'premium',
    name: 'プレミアム',
    price: '¥148,000',
    period: '/ 月',
    downloads: '300本',
    features: [
      '月300本まで動画ダウンロード',
      '全カテゴリーアクセス',
      '4K画質 (2160p)',
      '商用利用可能',
      '24/7サポート',
      'API アクセス',
      '最優先アクセス',
      'カスタムウォーターマーク',
      'オーダーメイド10%割引',
      '※最低契約期間3ヵ月',
    ],
  },
  {
    id: 'custom',
    name: 'オーダーメイド',
    price: '¥3,000',
    period: '〜 / 本',
    downloads: '個別制作',
    premium: true,
    features: [
      '完全カスタム動画制作',
      '指定キャスト・シーン対応',
      '4K画質 (2160p)',
      '商用利用可能',
      '専属サポート',
      '最短3営業日納品',
      'リテイク2回まで無料',
      '独占利用ライセンス',
      '特急対応可能 (+50%)',
    ],
  },
]

export function PricingPlans() {
  const { user } = useAuth()
  const { profile } = useProfile()

  const handleUpgrade = async (planId: string) => {
    if (!user) {
      window.location.href = '/signup'
      return
    }

    if (planId === 'custom') {
      window.location.href = '/custom-order'
      return
    }

    try {
      // Stripe Checkout integration
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Stripe integration error:', error)
      // Fallback for demo
      alert(`${planId}プランの決済ページへリダイレクトします。\n\n実際の決済にはStripe連携が必要です。\n\nデモ用リンク: https://checkout.stripe.com/demo`)
      
      // Demo: simulate successful upgrade
      setTimeout(() => {
        alert('デモ: プラン変更が完了しました（実際には決済処理が実行されます）')
      }, 2000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          料金プラン
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          あなたのニーズに合ったプランを選択してください
        </p>
        <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
          <Star className="h-4 w-4 mr-2" />
          3日間無料トライアル実施中
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
              plan.popular
                ? 'ring-2 ring-blue-600 bg-white dark:bg-gray-800'
                : plan.premium
                ? 'ring-2 ring-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                  👑 人気プラン
                </div>
              </div>
            )}
            {plan.premium && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
                  ✨ オーダーメイド
                </div>
              </div>
            )}

            <div className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  {plan.downloads}ダウンロード
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={profile?.subscription_plan === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    profile?.subscription_plan === plan.id
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : plan.premium
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                      : plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  }`}
                >
                  {profile?.subscription_plan === plan.id
                    ? '現在のプラン'
                    : plan.id === 'custom'
                    ? 'オーダー依頼'
                    : user
                    ? 'アップグレード'
                    : '無料トライアル開始'
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 max-w-4xl mx-auto">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ 重要事項（特定商取引法に基づく表記）</h4>
          <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 text-left">
            <p><strong>最低契約期間:</strong> 3ヵ月（初回お申し込み時）</p>
            <p><strong>契約期間中の解約:</strong> 違約金として残月数×月額料金をお支払いいただきます</p>
            <p><strong>3ヵ月経過後:</strong> いつでも解約可能（次回更新日の7日前までにご連絡）</p>
            <p><strong>返金対応:</strong> サービス利用開始後の返金は、システム障害等の当社都合に限ります</p>
            <p><strong>プラン変更:</strong> 上位プランへの変更は即時、下位プランへの変更は次回更新時に適用</p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          すべてのプランに商用利用ライセンスが含まれています。
          <br />
          <span className="text-sm">※3ヵ月の最低契約期間経過後は、いつでもプランの変更・解約が可能です。</span>
        </p>
        
        {/* 価値提案セクション */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🎬</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI最新技術</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Veo2/Veo3による最高品質の動画生成</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">💎</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">プレミアム品質</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">4K画質・商用利用可能・著作権フリー</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">即座ダウンロード</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">ワンクリックで高速ダウンロード開始</p>
          </div>
        </div>
      </div>
    </div>
  )
}