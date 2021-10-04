import { MAT_API } from "../components/environment";
import { CommandLineObject } from "./cwl";
export interface Model {
  id?: string;
  name?: string;
  display_name?: string;
  description?: string;
  type?: string;
  cwl_spec?: CommandLineObject;
  docker_image?: string;
  parameters?: Parameter[];
  inputs?: Input[];
}

export interface Parameter {
  id?: string;
  name: string;
  display_name?: string;
  description?: string;
  type?: string;
  unit?: string;
  unit_description?: string;
  data_type?: string;
  default?: Number | string | boolean;
  choices?: string[];
  min?: Number;
  max?: Number;
  prefix?: string;
}

export interface Input {
  id?: string;
  name: string;
  description?: string;
  display_name?: string;
  path?: string;
  prefix?: string;
}

export function createParameters(modelId: string, parameters: Parameter[]) {
  const url = `${MAT_API}/models/${modelId}/parameters`;
  return parameters.map((parameter) => 
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameter),
    })
  );
}

export function createInputs(modelId: string, inputs: Input[]) {
  const url = `${MAT_API}/models/${modelId}/inputs`;
  return inputs.map((input) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
  );
}
