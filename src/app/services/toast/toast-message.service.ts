// ANGULAR
import { Injectable } from '@angular/core';

// PRIME NG
import { MessageService } from 'primeng/api';

// TYPE
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

export interface ToastProps {
  severity: 'success' | 'warn' | 'info' | 'error';
  title: string;
  content?: string;
  sticky?: boolean;
  time?: number;
  position?: ToastPosition;
}

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly messageService: MessageService) {}

  private positionToKey(position: ToastPosition): string {
    switch (position) {
      case 'top-left':
        return 'tl';
      case 'top-center':
        return 'tc';
      case 'top-right':
        return 'tr';
      case 'bottom-left':
        return 'bl';
      case 'bottom-right':
        return 'br';
      case 'center':
        return 'c';
      case 'bottom-center':
      default:
        return 'bc';
    }
  }

  show({
    severity,
    title,
    content,
    sticky,
    time = 3000,
    position = 'bottom-center',
  }: ToastProps) {
    const key = this.positionToKey(position);

    this.messageService.add({
      severity,
      summary: title,
      detail: content,
      sticky,
      life: time,
      key: key,
    });
  }
}
