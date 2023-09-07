import { injectable } from "inversify";
import { SimpleActionHandler } from "./simple-action-handler";

@injectable()
export class RejectActionHandler extends SimpleActionHandler {
}