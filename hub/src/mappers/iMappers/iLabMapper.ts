import BaseMapper from "../../core/infra/baseMapper";
import Lab from "../../domain/lab/lab";
import ILabDto from "../../dto/iLabDto";
import ILabDataModel from "../../db/dataModel/iLabDataModel";

export default interface ILabMapper extends BaseMapper<Lab, ILabDto, ILabDataModel> {
}
