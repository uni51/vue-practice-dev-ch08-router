<template>
  <div class="about">
    <h1>記事コード : {{ aid }}</h1>
  </div>
</template>


<script>
// ナビゲーションガードを定義
let timeGuard = function(to, from, next) {
  // 有効期限を設定
  let data = {
    13: new Date(2019, 12, 30),
    108: new Date(2018, 10, 30)
  }

  // 移動先のaid値から有効期限を取得
  let limit = data[to.params.aid] ?
    data[to.params.aid] : new Date(2999, 12, 31)
  // 現在日時
  let current = new Date();
  // 有効期限内であれば、そのまま記事を表示
  if (limit && limit.getTime() > current.getTime()) {
    next()
  // さもなくば移動をキャンセル
  } else {
    window.alert('記事の公開期限が過ぎています。')
    next(false)
    //next(new Error('Error is occured.'))
  }
}

export default {
  name: 'Article',
  // ナビゲーションガードを紐付け
  beforeRouteEnter: timeGuard,
  beforeRouteUpdate: timeGuard,
  props: {
    aid: String
  }
}
</script>