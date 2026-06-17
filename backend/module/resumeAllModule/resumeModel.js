
import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String },
    role: { type: String },
    startDate: { type: String },
    endDate: { type: String }, // null = "Present"
    current: { type: Boolean, default: false },
    desc: { type: String },
  },
  { _id: false }
)

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String },
    year: { type: String },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema({
  title: { type: String },
  link: { type: String },
  desc: { type: String },
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  name: { type: String },
  issuer: { type: String },
  date: { type: String },
}, { _id: false });

const linksSchema = new mongoose.Schema(
  {
    github: { type: String, default: null },
    linkedin: { type: String, default: null },
    portfolio: { type: String, default: null },
    twitter: { type: String, default: null },
    website: { type: String, default: null },
  },
  { _id: false }
)

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // fast lookup by user
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
      default: 'My Resume',
    },
    content: {
      fullName: { type: String, default: '' },
      image: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      summary: { type: String, default: '' },
      experience: { type: [experienceSchema], default: [] },
      education: { type: [educationSchema], default: [] },
      project: { type: [projectSchema], default: [] },
      certification: { type: [certificationSchema], default: [] },
      skills: { type: [String], default: [] },
      languages: { type: [String], default: [] },
      links: { type: linksSchema, default: () => ({
          github: null,
          linkedin: null,
          portfolio: null,
          twitter: null
        })
      }
    },
    pdfUrl: {
      type: String,
      default: null, // filled after Puppeteer generates PDF
    },
    isPublic: {
      type: Boolean,
      default: false, // shareable public link
    },
    publicSlug: {
      type: String,
      default: null,
      sparse: true, // unique only when set
    },
  },
  { timestamps: true }
)

// Compound index: userId + createdAt for sorted user resume lists
//resumeSchema.index({ userId: 1, createdAt: -1 })

// Sparse unique index on publicSlug
//resumeSchema.index({ publicSlug: 1 }, { unique: true, sparse: true })

export const Resume = mongoose.model('Resume', resumeSchema)