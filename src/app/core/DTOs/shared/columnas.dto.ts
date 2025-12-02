import { GenericButtonColor } from "../../../shared/DTOs/generic-colors.dto";

export interface ColumnasDTO {
    field: string;
    label: string;
    pipe?: string;       
    pipeArgs?: any[];
}

export interface TableAction {
  icon: string | ((row: any) => string);
  color?: GenericButtonColor | ((row: any) => GenericButtonColor);
  visible?: boolean | ((row: any) => boolean);
  onClick: (row: any) => void;
}


