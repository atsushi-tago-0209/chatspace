$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="messages_message" data-message-id=${message.id}>
         <div class="messages__message__upper-info">
           <p1 class="messages-message__upper-info__user-name">
             ${message.user_name}
           </p1>
           <p2 class="messages-message__upper-info__date">
             ${message.created_at}
           </p2>
         </div>
         <div class="messages__message__lower-message">
           <p class="messages__message__lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="messages__message" data-message-id=${message.id}>
         <div class="messages__message__upper-info">
           <p1 class="messages-message__upper-info__user-name">
             ${message.user_name}
           </p1>
           <p2 class="messages-message__upper-info__date">
             ${message.created_at}
           </p2>
         </div>
         <div class="messages__message__lower-message">
           <p class="messages__message__lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
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
    $('.chat-main__form__input-box__message__submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  $(function(){
    $('img').css('display','')
    });
})
});

