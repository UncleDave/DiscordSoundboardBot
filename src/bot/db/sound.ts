import { Document, model, Schema } from 'mongoose';

interface Sound extends Document {
  name: string;
  file: string;
}

const SoundSchema = new Schema({
  name: { type: String, required: true, unique: true },
  file: { type: String, required: true, unique: true }
});

export default model<Sound>('Sound', SoundSchema);
