import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  gradeList = Array<IdTitle>();
  lessonList = Array<IdTitle>();
  isCollapsed = false;

  constructor(
    public contractBaseInfoService: ContractBaseInfoService,
    public service: ContractService,
  )
  {
  }

  ngOnInit(): void
  {

    const initLevel = this.teacherFormGroup.get('level')?.value;
    this.refreshGrades(initLevel);

    this.teacherFormGroup.get('level')?.valueChanges.subscribe(level =>
    {
      this.refreshGrades(level);
    });

    const initLesson = this.teacherFormGroup.get('grade')?.value;
    this.refreshLessons(initLesson);

    this.teacherFormGroup.get('grade')?.valueChanges.subscribe(grade =>
    {
      this.refreshLessons(grade);
    });
  }


  private refreshGrades(level: any)
  {
    if (level)
    {
      this.contractBaseInfoService.GetGradesByLevelId(level).subscribe(result =>
      {
        this.gradeList = result;
      });
    }
  }


  private refreshLessons(grade: any)
  {
    if (grade)
    {
      this.contractBaseInfoService.GetLessonsByGradeId(grade).subscribe(result =>
      {
        this.lessonList = result;
      });
    }
  }
}
