import { execSync } from "child_process";
type TheCmd = { description: string[]; subcmd: string[] };
type TheCmds = { [name: string]: TheCmd };
export class AwsHelp {
  public theCommands: TheCmds = {
    ["Ignore"]: { description: [""], subcmd: [""] },
  };

  constructor(max:number) {
    delete this.theCommands["Ignore"];
    var lines = execSync("aws help").toString().split("\n");
    var started: boolean = false;
    var lim = max+1;
    for (var l in lines) {
      var line = lines[l].trim();
      if (line === "Available Services") {
        started = true;
      }
      if (line === "See Also") {
        started = false;
      }
      if (
        lim > 0 &&
        started &&
        line.replace("*", "").trim() !== "" &&
        line.replace("*", "").trim() !== "help" &&
        line.trim() !== "" &&
        line !== "Available Services" &&
        line.trim() !== " "
      ) {
        lim--;
        var theCmd = line.replace("* ", "").replaceAll("*", "").trim();
        if (theCmd !== "") {
          var cmdInfo = this.getDesc(
            line.replace("* ", "").replaceAll("*", "").trim()
          );
          this.theCommands[line.replace("* ", "").trim()] = cmdInfo;
        }
      }
    }
  }

  public getDesc(cmd: string) {
    var theCmd: TheCmd = { description: [""], subcmd: [""] };
    theCmd.description.pop();
    theCmd.subcmd.pop();
    var helpLines: string[] = ["o"];
    helpLines.pop();
    var lines: string[] = [];
    try {
      lines = execSync("aws " + cmd + " help")
        .toString()
        .split("\r\n");
    } catch (error) {
      console.log("command is: aws " + cmd + " help\nerror is", error);
    }
    var description: boolean = false;
    var availableCommands: boolean = false;
    for (var l in lines) {
      var line = lines[l].trim();
      if (
        line !== "" &&
        line.replace("*", "").trim() !== "help" &&
        line.replaceAll("*", "").trim() !== ""
      ) {
        if (line === "Available Commands") {
          availableCommands = true;
          description = false;
        }
        if (line === "Description") {
          description = true;
          availableCommands = false;
        }
        if (description && line !== "Description") {
          theCmd.description.push(line);
        }
        if (availableCommands && line !== "Available Commands") {
          theCmd.subcmd.push(line.replace("* ", ""));
        }
      }
    }

    return theCmd;
  }
}
