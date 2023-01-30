import { Construct } from "constructs";
import * as blueprints from "@aws-quickstart/eks-blueprints";

export interface KyvernoAddOnProps extends blueprints.HelmAddOnUserProps {
  version?: string,
  name: string,
  createNamespace?: boolean,
  namespace: string
}

const defaultProps : blueprints.HelmAddOnProps & KyvernoAddOnProps = {
  name: "blueprints-kyverno-addon",
  namespace: "kyverno",
  chart: "kyverno",
  version: "2.5.3",
  release: "kyverno",
  repository: "https://kyverno.github.io/kyverno/",
  values: {}
}

export class KyvernoAddOn extends blueprints.HelmAddOn {

  readonly options: KyvernoAddOnProps;
  
  constructor(props?: KyvernoAddOnProps){
    super({ ...defaultProps, ...props });
    this.options = this.props as KyvernoAddOnProps;
  }

  deploy(clusterInfo: blueprints.ClusterInfo): void | Promise<Construct> {
    let values: blueprints.Values = populateValues(this.options);
    const chart = this.addHelmChart(clusterInfo, values);

    return Promise.resolve(chart)
  }
}

function populateValues(helmOptions: KyvernoAddOnProps): blueprints.Values{
  const values = helmOptions.values ?? {};
  return values;
}