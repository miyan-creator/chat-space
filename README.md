## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages


## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|none|
|image|string|none|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user