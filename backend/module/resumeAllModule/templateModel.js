import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,trim: true, unique: true },

    slug: {type:String, required: true,unique: true,lowercase: true},
    thumbnail: {type: String, default: null, },
    htmlFile: { type: String, default: null,},
    isPremium: { type: Boolean, default: false,},
    isActive: { type: Boolean, default: true, },
    category: {
      type: String,
      enum: ['simple', 'professional', 'creative', 'tech'],
      default: 'simple',
    },
    usageCount: { type: Number, default: 0},
  },
  { timestamps: true }
)

//templateSchema.index({ slug: 1 })
//templateSchema.index({ isPremium: 1, isActive: 1 })

export const Template = mongoose.model('Template', templateSchema)