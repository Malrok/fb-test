import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  private fbMessagerPopup;
  private hidden = true;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }

  ngAfterViewInit() {
    const iframes = document.getElementById('fb-root').getElementsByTagName('IFRAME');
    console.log('iframes ', iframes);
    for (let index = 0; index < iframes.length; index++) {
      const iframe = iframes.item[index];
      console.log('iframe[', index, '] ', iframe);
      if (iframe.hasAttribute('data-testid')) {
        this.fbMessagerPopup = iframe;
        break;
      }
    }
    console.log(this.fbMessagerPopup);
  }

  toggleMessenger() {
    console.log('className : ', typeof this.fbMessagerPopup.className);
    if (this.hidden) {
      // this.renderer.removeClass(this.fbMessagerPopup, 'fb_customer_chat_bounce_out_v2');
      // this.renderer.addClass(this.fbMessagerPopup, 'fb_customer_chat_bounce_in_v2');
      this.fbMessagerPopup.className = this.fbMessagerPopup.className.replace(' fb_customer_chat_bounce_out_v2', ' ');
      this.fbMessagerPopup.className += ' fb_customer_chat_bounce_in_v2';
    } else {
      // this.renderer.removeClass(this.fbMessagerPopup, 'fb_customer_chat_bounce_in_v2');
      // this.renderer.addClass(this.fbMessagerPopup, 'fb_customer_chat_bounce_out_v2');
      this.fbMessagerPopup.className = this.fbMessagerPopup.className.replace(' fb_customer_chat_bounce_in_v2', ' ');
      this.fbMessagerPopup.className += ' fb_customer_chat_bounce_out_v2';
    }
    this.hidden = !this.hidden;
  }
}
