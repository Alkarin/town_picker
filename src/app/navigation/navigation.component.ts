import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AnimationDirection} from '../models/animation-direction.enum';
import {TownsService} from '../towns.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements OnInit {
  @Input() currentPage;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  hidePrevButton: boolean;
  hideNextButton: boolean;
  animationDirection: AnimationDirection;

  constructor(private townsService: TownsService) {
    this.hidePrevButton = true;
    this.hideNextButton = false;
  }

  ngOnInit() {
    this.currentPage = 1;
    this.manageButtons(this.currentPage);
  }

  animateLeft() {
    this.animationDirection = AnimationDirection.LEFT;
  }

  animateRight() {
    this.animationDirection = AnimationDirection.RIGHT;
  }

  onActivate() {
    // OBSERVABLE
    this.townsService.activated.next();
  }

  navNext() {
    // Increment by 1
    this.currentPage++;
    this.animateRight();
    this.notify.emit({currentPage: this.currentPage, animationDirection: this.animationDirection});
    this.manageButtons(this.currentPage);

    this.onActivate();
  }

  navPrev() {
    // Decrement by 1
    this.currentPage--;
    this.animateLeft();
    this.notify.emit({currentPage: this.currentPage, animationDirection: this.animationDirection});
    this.manageButtons(this.currentPage);
  }

  manageButtons(value) {
    if (value === 1) {
      // On first page
      this.hidePrevButton = true;
      this.hideNextButton = false;
    } else {
      this.hidePrevButton = false;
      this.hideNextButton = true;
    }
  }
}

