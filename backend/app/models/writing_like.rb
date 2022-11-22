class WritingLike
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :site_user
  belongs_to :writing
end
