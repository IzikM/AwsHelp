import { AwsHelp } from "./classes/AwsHelp";
import { writeFileSync } from "fs";
var x: AwsHelp = new AwsHelp(9999);
writeFileSync('./theCommands.txt',JSON.stringify(x.theCommands,undefined,2));

