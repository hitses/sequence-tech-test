import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'song-card-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() title!: string;
  @Input() artist!: string;
  @Input() img!: string;
  @Input() genres!: string[];
}
