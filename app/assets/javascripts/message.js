$(function(){
  var buildHTML = function(message) {
      var imagehtml = message.image.url == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
      var html = `<div class="message" data-id=' + message.id + '>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${imagehtml}
        </div>
      </div>`
    return html;
  };
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
    $('html,body').animate({scrollTop: 0}, 1000, 'swing');

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
  group_id = $(".main__header__left__box__current-group").data('group_id')
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: '/groups/${group_id}/api/messages',
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id},
    processData: false,
    contentType: false
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message){
      insertHTML += buildHTML(message);
    })
    $('.main__content').append(insertHTML)
    $("html,body").animate({scrollTop: $(document).height()
    },1500);
  })
  .fail(function() {
    console.log('error');
  });
  };
  setInterval(reloadMessages, 5000);
});