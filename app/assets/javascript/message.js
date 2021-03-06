$(function(){
  var reloadMessages = function() {
    last_message_id = $('.messages__message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert("自動更新が正しくできませんでした");
      });
  };
  var buildHTML =function (message){
   if ( message.content && message.image ) {
     var html =
      `<div class="messages__message" data-message-id=${message.id}>
         <div class="messages__message__upper-info">
           <div class="messages__message__upper-info__user-name">
             ${message.user_name}
           </div>
           <div class="messages__message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="messages__message__lower-message">
           <div class="messages__message__lower-message__content">
             ${message.content}
           </div>
         </div>
          <img src=${message.image} >
       </div>`
     return html;
   } else if (message.content) {
     var html =
      `<div class="messages__message" data-message-id=${message.id}>
         <div class="messages__message__upper-info">
           <div class="messages__message__upper-info__user-name">
             ${message.user_name}
           </div>
           <div class="messages__message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="messages__message__lower-message">
           <div class="messages__message__lower-message__content">
             ${message.content}
           </div>
         </div>
        </div>`
    } else if (message.image)
    var html =
      `<div class="messages__message" data-message-id=${message.id}>
         <div class="messages__message__upper-info">
           <div class="messages__message__upper-info__user-name">
             ${message.user_name}
           </div>
           <div class="messages__message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="messages__message__lower-message">
           <div class="messages__message__lower-message__content">
            <img src=${message.image} >
           </div>
         </div>
       </div>`
     return html;
   };
 $('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
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
    $('.messages').append(html);      
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('.submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    $('.chat-main__form__input-box__message__submit-btn').prop('disabled', false);
  })
  $(function(){
    $('img').css('display','')
    });
 })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});