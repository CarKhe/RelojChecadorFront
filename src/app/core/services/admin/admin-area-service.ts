import { Injectable } from '@angular/core';
import { AreaFormDTO } from '../../DTOs/admin/area-form.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminAreaService {
  
  guardarArea(areaForm: AreaFormDTO){
    console.log(areaForm);
  }
}
