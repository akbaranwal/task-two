import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.css']
})
export class TaskTwoComponent implements OnInit {
  shortcutUrlFirst: string = '';
  shortcutUrlSecond: string = '';

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  shortUrl(url: string): void {
    this.service.getShortUrl(url)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('You Enter something wrong !'));
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.shortcutUrlFirst = res.result.short_link;
            this.shortcutUrlSecond = res.result.short_link2;
          }
        },
        error: (err) => {
          alert("Enter a valid url format like xyz.com");
        },
      })
  }
}
