import React from 'react'

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              事業者情報
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>事業者名:</strong> VeoMaster Pro運営事務局</p>
              <p><strong>所在地:</strong> 〒[郵便番号] [住所]</p>
              <p><strong>電話番号:</strong> [電話番号]</p>
              <p><strong>メールアドレス:</strong> support@veomaster.pro</p>
              <p><strong>営業時間:</strong> 平日 9:00-18:00（土日祝日除く）</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              販売価格・料金
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>ベーシックプラン:</strong> 月額 49,800円（税込）</p>
              <p><strong>スタンダードプラン:</strong> 月額 98,000円（税込）</p>
              <p><strong>プレミアムプラン:</strong> 月額 148,000円（税込）</p>
              <p><strong>オーダーメイド:</strong> 1本 3,000円〜（税込・要見積）</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                ※表示価格はすべて税込み価格です
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              支払方法・支払時期
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>支払方法:</strong> クレジットカード決済（Stripe）</p>
              <p><strong>対応カード:</strong> Visa、Mastercard、American Express、JCB</p>
              <p><strong>支払時期:</strong> 毎月自動課金（初回は申込時、以降は毎月同日）</p>
              <p><strong>請求書:</strong> 決済完了後、登録メールアドレスに送付</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              契約期間・解約について
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ⚠️ 重要：最低契約期間について
              </h3>
              <div className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                <p><strong>最低契約期間:</strong> 3ヵ月（初回お申し込み時）</p>
                <p><strong>期間中の解約:</strong> 違約金として残月数×月額料金をお支払いいただきます</p>
                <p><strong>3ヵ月経過後:</strong> いつでも解約可能（次回更新日の7日前までにご連絡）</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>解約方法:</strong> 会員ページまたはメールでのご連絡</p>
              <p><strong>解約期限:</strong> 次回更新日の7日前まで</p>
              <p><strong>解約後:</strong> 残りの契約期間中はサービス利用可能</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              返金・キャンセルについて
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>基本方針:</strong> サービス利用開始後の返金は原則として行いません</p>
              <p><strong>返金対象:</strong> 以下の場合に限り返金いたします</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>当社システム障害により7日以上サービス提供できない場合</li>
                <li>当社の重大な過失によりサービス提供に支障が生じた場合</li>
                <li>契約内容と異なるサービスが提供された場合</li>
              </ul>
              <p><strong>返金方法:</strong> 原則として決済に使用されたクレジットカードへの返金</p>
              <p><strong>返金時期:</strong> 承認後30日以内</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              サービス提供について
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>提供方法:</strong> インターネット経由でのデジタルコンテンツ配信</p>
              <p><strong>提供時期:</strong> 決済完了後、即時アクセス可能</p>
              <p><strong>利用環境:</strong> インターネット接続環境必須</p>
              <p><strong>動作環境:</strong> 主要ブラウザ対応（Chrome、Safari、Firefox、Edge）</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              個人情報の取扱い
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>取得情報:</strong> 氏名、メールアドレス、決済情報、利用履歴</p>
              <p><strong>利用目的:</strong> サービス提供、課金処理、サポート対応、サービス改善</p>
              <p><strong>第三者提供:</strong> 法令に基づく場合を除き、第三者への提供は行いません</p>
              <p><strong>詳細:</strong> <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">プライバシーポリシー</a>をご確認ください</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              お問い合わせ・苦情対応
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>窓口:</strong> VeoMaster Pro カスタマーサポート</p>
              <p><strong>メールアドレス:</strong> support@veomaster.pro</p>
              <p><strong>電話番号:</strong> [電話番号]</p>
              <p><strong>受付時間:</strong> 平日 9:00-18:00（土日祝日除く）</p>
              <p><strong>回答期限:</strong> お問い合わせから3営業日以内</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              その他
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>準拠法:</strong> 日本法</p>
              <p><strong>管轄裁判所:</strong> 東京地方裁判所を第一審の専属的合意管轄裁判所とします</p>
              <p><strong>本表記の変更:</strong> 法令の変更等により内容を変更する場合があります</p>
              <p><strong>最終更新:</strong> 2025年6月30日</p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ご不明な点がございましたら、上記お問い合わせ先までお気軽にご連絡ください。
          </p>
        </div>
      </div>
    </div>
  )
}