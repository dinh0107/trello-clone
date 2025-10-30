import { map, Subscription } from 'rxjs';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Cards } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuStateService } from 'src/app/core/menu-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card/view-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id!: number
  @Input() connectedLists: string[] = [];
  @Input() listId!: number;

  cards: Cards[] = [];
  selectedCard: Cards | null = null;
  private sub!: Subscription;
  showMenu = false;
  menuPosition = { x: 0, y: 0 };
  constructor(private service: JobService, private menuState: MenuStateService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getCardByList(this.id).subscribe(cards => {
      this.cards = cards
    })
    this.service.card$.pipe(map(card => card.get(this.id) || []))
      .subscribe(cards => {
        this.cards = cards
      })
    this.sub = this.menuState.openListId$.subscribe(openListId => {
      if (openListId !== this.id) {
        this.showMenu = false;
        this.selectedCard = null;
      }
    });
  }



  openMenu(event: MouseEvent, card: Cards) {
    event.preventDefault();
    if (this.selectedCard?.Id === card.Id && this.showMenu) {
      this.closeMenu();
      return;
    }
    this.menuState.openList(this.listId);
    this.selectedCard = card;
    this.showMenu = true;
  }

  @HostListener('document:click', ['$event'])

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.context-menu')) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.showMenu = false;
    this.selectedCard = null;
    this.menuState.closeAll();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  dropCard(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const movedCard = event.container.data[event.currentIndex];
    movedCard.ListId = this.id;
    movedCard.Sort = event.currentIndex;



    const body = {
      CardId: movedCard.Id,
      TargetListId: movedCard.ListId,
      NewSort: event.currentIndex
    }
    console.log(body);

    this.service.moveCard(body).subscribe({
      next(value) {
        console.log("Change:", value)
      },
    })
  }




  openCard(card: Cards) {
    this.service.viewCard(card.Id).subscribe({
      next: (value) => {
        const diaLogRef = this.dialog.open(ViewCardComponent, {
          width: '60%',
          position: {
            top: '50px',
          },
          data: value,
        })
        diaLogRef.afterClosed().subscribe(() => {
          console.log("Đóng")
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.showMenu = false;
  }
  editCard(card: any) { console.log('Sửa nhãn', card); this.showMenu = false; }
  changeMember(card: any) { console.log('Đổi thành viên', card); this.showMenu = false; }
  changeCover(card: any) { console.log('Đổi bìa', card); this.showMenu = false; }
  changeDate(card: any) { console.log('Chỉnh ngày', card); this.showMenu = false; }
  moveCard(card: any) { console.log('Di chuyển', card); this.showMenu = false; }
  copyCard(card: any) { console.log('Sao chép', card); this.showMenu = false; }
  copyLink(card: any) { console.log('Sao chép link', card); this.showMenu = false; }
  deleteCard(card: any) { console.log('Lưu trữ', card); this.showMenu = false; }

}
