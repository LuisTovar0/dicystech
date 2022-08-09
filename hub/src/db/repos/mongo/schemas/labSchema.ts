import {model, Schema} from "mongoose";
import ILabDataModel from "../../../dataModel/iLabDataModel";

const labSchema = model<ILabDataModel>(`Lab`, new Schema({
  domainId: {
    type: String,
    required: [true, `Database requires a Lab ID.`],
    unique: true
  },
  name: {
    type: String,
    required: [true, `Database requires a Lab name`],
    unique: true
  },
  country: {
    type: String,
    required: [true, `Database requires a Lab country.`],
  },
  components: [String]
}, {timestamps: true}));

export default labSchema;