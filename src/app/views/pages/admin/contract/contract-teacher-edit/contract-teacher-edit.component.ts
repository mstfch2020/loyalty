import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboTypes } from 'src/app/@core/data/loyalty/enums.model';
import { IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { ContractBaseInfoService } from 'src/app/@core/services/loyalty/contract-base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';

@Component({
  selector: 'app-contract-teacher-edit',
  templateUrl: './contract-teacher-edit.component.html',
  styleUrls: ['./contract-teacher-edit.component.scss']
})
export class ContractTeacherEditComponent implements OnInit
{
  @Input() index = 0;
  @Input() teacherFormGroup: FormGroup;

  isCollapsed = false;

  constructor(
    public contractBaseInfoService: ContractBaseInfoService,
    public service: ContractService,
  )
  {
  }

  ngOnInit(): void
  {

  }

  comboChanged($event: IdTitle, type: ComboTypes): void
  {
    if (!$event) { return; }
    if ($event.id) { return; }

    switch (type)
    {
      case ComboTypes.Area: {
        this.handleArea($event);
        break;
      }
      case ComboTypes.Education: {
        this.handleEducation($event);
        break;
      }
      case ComboTypes.Grade: {
        this.handleGrade($event);
        break;
      }
      case ComboTypes.Lesson: {
        this.handleLesson($event);
        break;
      }
      case ComboTypes.SchoolType: {
        this.handleSchoolType($event);
        break;
      }
    }
  }

  private handleArea($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.areas$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.teacherFormGroup.get('area')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateArea($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.areas$.next(lst);
          this.teacherFormGroup.get('area')?.setValue($event.id);
        }
      });
    }
  }

  private handleEducation($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.educationLevel$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.teacherFormGroup.get('level')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateEducationLevel($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.educationLevel$.next(lst);
          this.teacherFormGroup.get('level')?.setValue($event.id);
        }
      });
    }
  }

  private handleGrade($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.grades$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.teacherFormGroup.get('grade')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateGrade($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.grades$.next(lst);
          this.teacherFormGroup.get('grade')?.setValue($event.id);
        }
      });
    }
  }


  private handleLesson($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.lessons$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.teacherFormGroup.get('lesson')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateGrade($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.lessons$.next(lst);
          this.teacherFormGroup.get('lesson')?.setValue($event.id);
        }
      });
    }
  }

  private handleSchoolType($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.schoolType$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.teacherFormGroup.get('schoolType')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateGrade($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.lessons$.next(lst);
          this.teacherFormGroup.get('schoolType')?.setValue($event.id);
        }
      });
    }
  }


  addTag(term: string)
  {
    if (term)
    {
      return { id: null, title: term };
    }
    return null;
  }

}
