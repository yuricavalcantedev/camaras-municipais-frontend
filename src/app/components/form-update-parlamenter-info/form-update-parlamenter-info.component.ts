import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UpdateParlamentarInfoDTO } from 'src/app/dto/update-parlamentar-info-dto.model';
import { ParlamentarService } from 'src/app/service/parlamentar.service';

@Component({
  selector: 'app-form-update-parlamenter-info',
  templateUrl: './form-update-parlamenter-info.component.html',
  styleUrls: ['./form-update-parlamenter-info.component.css']
})
export class FormUpdateParlamenterInfoComponent implements OnInit {

  parlamentarId: number = 0;
  parlamentarOldName: string = '';

  formUpdateInfo: FormGroup;
  submitted: boolean = false;

  constructor(private parlamentarService: ParlamentarService,  public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,  private messageService: MessageService) { }


  ngOnInit(): void {
    
    this.parlamentarOldName = this.config.data.oldName;
    this.parlamentarId = this.config.data.id;

    this.formUpdateInfo = new FormGroup({
          newName: new FormControl({value: '', disabled: false}),
    });
  }

  updateUserInfo(updateUserInfoDTO: UpdateParlamentarInfoDTO){

    this.parlamentarService.updateInfo(updateUserInfoDTO).subscribe({
      next: data => {
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Informação atualizada com sucesso!'});
        this.onCancel();
        this.ref.close();
      },error: err => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
      }
    });
  }

    get form(): { [key: string]: AbstractControl } {
      return this.formUpdateInfo.controls;
    }
  

  onSubmit(){
  
      this.submitted = true;
  
      if (this.formUpdateInfo.invalid) {
        return;
      }

      let formValue = this.formUpdateInfo.value;
      let updateParlamentarInfoDTO = new UpdateParlamentarInfoDTO(this.parlamentarId, formValue.newName);
      
      this.updateUserInfo(updateParlamentarInfoDTO);
    }
  
    onCancel(){
  
      this.submitted = false;
      this.formUpdateInfo.reset();
    }

}
