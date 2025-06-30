import React, { useState } from 'react'
import { Send, DollarSign, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export function CustomOrderForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    ageRange: '',
    faceType: '',
  })

  const ageRanges = [
    '20代前半 (20-24歳)',
    '20代後半 (25-29歳)',
    '30代前半 (30-34歳)',
    '30代後半 (35-39歳)',
    '40代前半 (40-44歳)',
    '40代後半 (45-49歳)',
    '50代以上',
  ]

  const faceTypes = [
    '可愛い系',
    '美人系',
    'ナチュラル系',
    'クール系',
    'エレガント系',
    '親しみやすい系',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from('custom_orders')
        .insert({
          user_id: user.id,
          description: formData.description,
          age_range: formData.ageRange,
          face_type: formData.faceType,
        })

      if (error) throw error

      setSuccess(true)
      setFormData({
        description: '',
        ageRange: '',
        faceType: '',
      })
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('オーダーの送信に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ログインが必要です
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            オーダーメイド動画を依頼するにはログインしてください
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ログイン
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            オーダーを受付いたしました
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ご依頼いただいたオーダーメイド動画の内容を確認し、
            3営業日以内にお見積もりと制作スケジュールをご連絡いたします。
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            新しいオーダーを作成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          オーダーメイド動画依頼
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          あなたの要望に合わせたカスタム動画を制作いたします
        </p>
      </div>

      {/* Pricing Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
          <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            料金
          </h3>
          <p className="text-2xl font-bold text-blue-600">¥3,000〜</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">/ 1本</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 text-center">
          <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            制作期間
          </h3>
          <p className="text-2xl font-bold text-purple-600">3営業日</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">最短納期</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
          <Send className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            修正回数
          </h3>
          <p className="text-2xl font-bold text-green-600">2回</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">まで無料</p>
        </div>
      </div>

      {/* Order Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              動画の内容・シーンの詳細 *
            </label>
            <textarea
              id="description"
              rows={6}
              required
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例: 朝のスキンケアルーティンを行う動画。洗顔→化粧水→美容液→乳液の順番で、ゆっくりと丁寧に行う様子を撮影したい。明るい洗面所で、ナチュラルな表情で..."
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              できるだけ詳細にご記入ください（撮影場所、動作、表情など）
            </p>
          </div>

          <div>
            <label
              htmlFor="ageRange"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              出演者の年齢層 *
            </label>
            <select
              id="ageRange"
              required
              value={formData.ageRange}
              onChange={(e) => handleChange('ageRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">年齢層を選択してください</option>
              {ageRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="faceType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              顔の系統・タイプ *
            </label>
            <select
              id="faceType"
              required
              value={formData.faceType}
              onChange={(e) => handleChange('faceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">顔の系統を選択してください</option>
              {faceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              ご注意事項
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 制作開始前にお見積もりと詳細な仕様書を送付いたします</li>
              <li>• 修正は3回まで無料、4回目以降は追加料金が発生します</li>
              <li>• 著作権・商用利用権は制作費に含まれています</li>
              <li>• キャンセルは制作開始前のみ可能です</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>{loading ? 'オーダー送信中...' : 'オーダーを送信'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}