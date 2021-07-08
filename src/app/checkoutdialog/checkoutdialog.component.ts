import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkoutdialog',
  templateUrl: './checkoutdialog.component.html',
  styleUrls: ['./checkoutdialog.component.css']
})
export class CheckoutdialogComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
 

}
