import React, { useState, useEffect } from 'react'
import { User, Download, Heart, Calendar, CreditCard, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabase'

export function UserDashboard() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const [downloads, setDownloads] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      const [downloadsRes, favoritesRes] = await Promise.all([
        supabase
          .from('downloads')
          .select('*, videos(*)')
          .eq('user_id', user.id)
          .order('downloaded_at', { ascending: false })
          .limit(10),
        supabase
          .from('favorites')
          .select('*, videos(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10),
      ])

      if (downloadsRes.error) throw downloadsRes.error
      if (favoritesRes.error) throw favoritesRes.error

      setDownloads(downloadsRes.data || [])
      setFavorites(favoritesRes.data || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'trial':
        return 'トライアル'
      case 'basic':
        return 'ベーシック'
      case 'standard':
        return 'スタンダード'
      case 'premium':
        return 'プレミアム'
      default:
        return plan
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'trial':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      case 'basic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'standard':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'premium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ダッシュボード
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          アカウント情報とダウンロード履歴を確認できます
        </p>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <User className="h-12 w-12 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                アカウント
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CreditCard className="h-12 w-12 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                現在のプラン
              </h3>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(
                  profile?.subscription_plan || 'trial'
                )}`}
              >
                {getPlanName(profile?.subscription_plan || 'trial')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Download className="h-12 w-12 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                残りダウンロード
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profile?.subscription_plan === 'premium'
                  ? '無制限'
                  : `${profile?.downloads_remaining || 0}回`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Info */}
      {profile?.subscription_plan === 'trial' && profile?.trial_ends_at && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-3">
              <p className="text-yellow-800 dark:text-yellow-200">
                トライアル期間は{' '}
                {new Date(profile.trial_ends_at).toLocaleDateString('ja-JP')} まで有効です
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Downloads */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Download className="h-5 w-5 mr-2" />
              最近のダウンロード
            </h2>
          </div>
          <div className="p-6">
            {downloads.length > 0 ? (
              <div className="space-y-4">
                {downloads.slice(0, 5).map((download: any) => (
                  <div
                    key={download.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <img
                      src={download.videos.thumbnail_url}
                      alt={download.videos.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {download.videos.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(download.downloaded_at).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                まだダウンロードした動画がありません
              </p>
            )}
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              お気に入り
            </h2>
          </div>
          <div className="p-6">
            {favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.slice(0, 5).map((favorite: any) => (
                  <div
                    key={favorite.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <img
                      src={favorite.videos.thumbnail_url}
                      alt={favorite.videos.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {favorite.videos.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(favorite.created_at).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                まだお気に入りに追加した動画がありません
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          クイックアクション
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/pricing'}
            className="p-4 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              プランをアップグレード
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              より多くのダウンロードを利用
            </p>
          </button>

          <button
            onClick={() => window.location.href = '/custom-order'}
            className="p-4 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <Settings className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              オーダーメイド依頼
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              カスタム動画を注文
            </p>
          </button>

          <button
            onClick={() => window.location.href = '/favorites'}
            className="p-4 text-left bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Heart className="h-8 w-8 text-red-600 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              お気に入りを見る
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              保存した動画を確認
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}