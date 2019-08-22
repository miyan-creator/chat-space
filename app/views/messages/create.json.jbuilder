json.content  @message.content
json.image  @message.image.url
json.created_at @message.created_at.to_s
json.user_name  @message.user.name
json.group_id  @message.group.id