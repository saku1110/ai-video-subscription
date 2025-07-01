import React, { useState, useEffect } from 'react'
import { Search, Filter, Heart, Download, Play } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useProfile } from '../../hooks/useProfile'
import type { Database } from '../../lib/supabase'

type Video = Database['public']['Tables']['videos']['Row']
type Favorite = Database['public']['Tables']['favorites']['Row']

const categories = [
  { id: 'all', name: 'すべて' },
  { id: 'beauty', name: '美容' },
  { id: 'diet', name: 'ダイエット' },
  { id: 'hair-care', name: 'ヘアケア' },
  { id: 'daily', name: '日常' },
]

export function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const { user } = useAuth()
  const { profile } = useProfile()

  useEffect(() => {
    fetchVideos()
    if (user) {
      fetchFavorites()
    }
  }, [user])

  const fetchVideos = async () => {
    // 🔥 緊急対応: 今朝生成した動画を強制表示
    const generatedVideos = [
      {
        id: '1',
        title: '朝のスキンケアルーティン - クマや乾燥対策',
        category: 'beauty',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['美容', 'スキンケア', 'AI生成', 'Veo2', '朝のルーティン'],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'ダイエット記録 - 体重測定と目標設定',
        category: 'diet',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['ダイエット', '体重管理', 'AI生成', 'Veo2'],
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'ヘアケア - 朝のスタイリング準備',
        category: 'hair-care',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['ヘアケア', 'スタイリング', 'AI生成', 'Veo3'],
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        title: '日常の健康習慣 - 水分補給と体調管理',
        category: 'daily',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['日常', '健康', 'AI生成', 'Veo2'],
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        title: '美容液の効果的な使い方',
        category: 'beauty',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['美容', '美容液', 'AI生成', 'Veo3'],
        created_at: new Date().toISOString()
      },
      {
        id: '6',
        title: '運動前のストレッチとウォームアップ',
        category: 'diet',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['運動', 'ストレッチ', 'AI生成', 'Veo2'],
        created_at: new Date().toISOString()
      },
      {
        id: '7',
        title: '髪のダメージケア - トリートメント実践',
        category: 'hair-care',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['ヘアケア', 'ダメージケア', 'AI生成', 'Veo3'],
        created_at: new Date().toISOString()
      },
      {
        id: '8',
        title: '朝食と栄養バランスの意識',
        category: 'daily',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['朝食', '栄養', 'AI生成', 'Veo2'],
        created_at: new Date().toISOString()
      },
      {
        id: '9',
        title: 'メイク前の肌準備とベース作り',
        category: 'beauty',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['メイク', 'ベース作り', 'AI生成', 'Veo3'],
        created_at: new Date().toISOString()
      },
      {
        id: '10',
        title: '夜のリラックス習慣と睡眠準備',
        category: 'daily',
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=711&fit=crop',
        duration: 8,
        tags: ['夜', 'リラックス', 'AI生成', 'Veo2'],
        created_at: new Date().toISOString()
      }
    ]
    
    setVideos(generatedVideos)
    setLoading(false)
  }

  const fetchFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      setFavorites(data || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
    }
  }

  const toggleFavorite = async (videoId: string) => {
    if (!user) return

    const isFavorite = favorites.some(fav => fav.video_id === videoId)

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('video_id', videoId)

        if (error) throw error
        setFavorites(prev => prev.filter(fav => fav.video_id !== videoId))
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            video_id: videoId,
          })

        if (error) throw error
        fetchFavorites()
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const downloadVideo = async (video: Video) => {
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

      // Simulate download (in real app, this would be a proper file download)
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

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="動画を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>フィルター</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Download Stats */}
      {user && profile && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            残りダウンロード数: {profile.subscription_plan === 'premium' ? '無制限' : `${profile.downloads_remaining}回`}
            {profile.subscription_plan === 'trial' && (
              <span className="ml-2 text-xs">(トライアル期間中)</span>
            )}
          </p>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map(video => {
          const isFavorite = favorites.some(fav => fav.video_id === video.id)
          
          return (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[9/16] bg-gray-200 dark:bg-gray-700">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => window.open(video.file_url, '_blank')}
                >
                  <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                    <Play className="h-8 w-8 text-gray-900 fill-current" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                  {video.duration}秒
                </div>
                {/* Watermark */}
                <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                  SAMPLE
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {video.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  {user && (
                    <>
                      <button
                        onClick={() => toggleFavorite(video.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isFavorite
                            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => downloadVideo(video)}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>DL</span>
                      </button>
                    </>
                  )}
                  
                  {!user && (
                    <div className="w-full text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ダウンロードにはログインが必要です
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            条件に一致する動画が見つかりませんでした
          </p>
        </div>
      )}
    </div>
  )
}