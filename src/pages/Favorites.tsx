import React, { useState, useEffect } from 'react'
import { Heart, Download, Trash2, Search } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'

export function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  const { user } = useAuth()
  const { profile } = useProfile()

  useEffect(() => {
    if (user) {
      fetchFavorites()
    }
  }, [user])

  const fetchFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*, videos(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setFavorites(data || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (favoriteId: string, videoId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId)

      if (error) throw error
      
      setFavorites(prev => prev.filter((fav: any) => fav.id !== favoriteId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const downloadVideo = async (video: any) => {
    if (!user || !profile) return

    if (profile.downloads_remaining <= 0 && profile.subscription_plan !== 'premium') {
      alert('ダウンロード上限に達しました。プランをアップグレードしてください。')
      return
    }

    try {
      // Record download
      const { error: downloadError } = await supabase
        .from('downloads')
        .insert({
          user_id: user.id,
          video_id: video.id,
        })

      if (downloadError) throw downloadError

      // Update remaining downloads (except for premium)
      if (profile.subscription_plan !== 'premium') {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            downloads_remaining: profile.downloads_remaining - 1,
          })
          .eq('id', user.id)

        if (updateError) throw updateError
      }

      // Simulate download
      const link = document.createElement('a')
      link.href = video.file_url
      link.download = `${video.title}.mp4`
      link.click()

      alert('ダウンロードを開始しました')
    } catch (error) {
      console.error('Error downloading video:', error)
      alert('ダウンロードに失敗しました')
    }
  }

  const filteredFavorites = favorites.filter((favorite: any) =>
    favorite.videos.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ログインが必要です
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            お気に入りを確認するにはログインしてください
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Heart className="h-8 w-8 text-red-500 mr-3" />
          お気に入り
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          保存した動画素材を管理できます
        </p>
      </div>

      {favorites.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="お気に入りを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFavorites.map((favorite: any) => (
            <div
              key={favorite.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[9/16] bg-gray-200 dark:bg-gray-700">
                <img
                  src={favorite.videos.thumbnail_url}
                  alt={favorite.videos.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                  {favorite.videos.duration}秒
                </div>
                <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                  SAMPLE
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {favorite.videos.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {favorite.videos.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  追加日: {new Date(favorite.created_at).toLocaleDateString('ja-JP')}
                </p>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => removeFavorite(favorite.id, favorite.videos.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => downloadVideo(favorite.videos)}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>DL</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? '検索結果が見つかりません' : 'お気に入りがありません'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm 
              ? '別のキーワードで検索してみてください'
              : '動画を閲覧してお気に入りに追加してみましょう'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              動画を見る
            </button>
          )}
        </div>
      )}
    </div>
  )
}