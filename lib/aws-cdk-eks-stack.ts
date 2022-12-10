import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as blueprints from "@aws-quickstart/eks-blueprints";

export class AwsCdkEks extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    blueprints.EksBlueprint.builder()
      .account(account)
      .region(region)
      .teams()
      .addOns()
      .build(scope, `${id}-ClusterEKS`)
  }
}
