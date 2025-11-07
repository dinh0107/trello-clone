import { map, Subscription } from 'rxjs';
import {
  Component,
  computed,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Cards } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuStateService } from 'src/app/core/menu-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card/view-card.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id!: number;
  @Input() connectedLists: string[] = [];
  @Input() listId!: number;
  @Input() boardId!: number;

  selectedCard: Cards | null = null;
  private sub!: Subscription;
  showMenu = false;
  menuPosition = { x: 0, y: 0 };
  constructor(
    private service: JobService,
    private menuState: MenuStateService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const cardId = Number(this.id);
    this.service.getCardByList(this.id);

    this.sub = this.menuState.openListId$.subscribe((openListId) => {
      if (openListId !== this.id) {
        this.showMenu = false;
        this.selectedCard = null;
      }
    });
  }

  get cards() {
    return this.service.cards().get(this.id) || [];
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

  userOfCard = computed(() => {
    const cardId = Number(this.id);
    return this.service.userByCards().get(cardId) || [];
  });

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
      NewSort: event.currentIndex,
    };
    console.log(body);

    this.service.moveCard(body).subscribe({
      next(value) {
        console.log('Change:', value);
      },
    });
  }

  openCard(card: Cards) {
    this.service.viewCard(card.Id).subscribe({
      next: (value) => {
        const diaLogRef = this.dialog.open(ViewCardComponent, {
          width: '60%',
          position: {
            top: '50px',
          },
          data: { ...value, boardId: this.boardId },
        });
        diaLogRef.afterClosed().subscribe(() => {
          console.log('Đóng');
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.showMenu = false;
  }
  editCard(card: any) {
    console.log('Sửa nhãn', card);
    this.showMenu = false;
  }
  changeMember(card: any) {
    console.log('Đổi thành viên', card);
    this.showMenu = false;
  }
  changeCover(card: any) {
    console.log('Đổi bìa', card);
    this.showMenu = false;
  }
  changeDate(card: any) {
    console.log('Chỉnh ngày', card);
    this.showMenu = false;
  }
  moveCard(card: any) {
    console.log('Di chuyển', card);
    this.showMenu = false;
  }
  copyCard(card: any) {
    console.log('Sao chép', card);
    this.showMenu = false;
  }
  copyLink(card: any) {
    console.log('Sao chép link', card);
    this.showMenu = false;
  }
  deleteCard(card: Cards) {
    this.service.deleteCad(card.Id, card.ListId).subscribe({
      next: (res) => {
        if (res.Success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Xóa thành công',
            key: 'br',
            life: 3000,
          });
        }
      },
    });
    this.showMenu = false;
  }
}
