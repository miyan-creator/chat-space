$(function(){
  function buildHTML(message){
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image =""
    var html = `<div class="main__content__message__upper-box">
                  <div class="main__content__message__upper-box__user-name">
                    ${message.user_name}
                  </div> 
                  <div class="main__content__message__upper-box__time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="main__content__message__text-box">
                  <p class="main__content__message__text-box__text">
                    ${message.content}
                  </p>
                  ${image}
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main__content').append(html);
    $('form')[0].reset();
    $("html,body").animate({scrollTop: $(document).height()
    },1500);

  })
  .fail(function(){
    alert('error');
  })
  .always(() => {
    $(".form__submit").removeAttr("disabled");
  });
 })

 var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $("#data")
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: '/groups/${group_id}/api/messages',
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    console.log('success');
  })
  .fail(function() {
    console.log('error');
  });
};
});