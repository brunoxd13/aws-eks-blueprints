import { ApplicationTeam } from "@aws-quickstart/eks-blueprints";
import { ArnPrincipal } from "aws-cdk-lib/aws-iam";

export class TeamApplication extends ApplicationTeam {
  constructor(name: string, accountID: string){
    super({
      name: name,
      users: [ new ArnPrincipal(`arn:aws:iam::${accountID}:user/application`) ]
    })
  }
}