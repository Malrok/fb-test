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
    setTimeout(() => {
      const iframes = document.getElementById('fb-root').getElementsByTagName('IFRAME');
      console.log('iframes ', iframes, ' length: ', iframes.length);

      let goOn = true;
      let index = 0;
      while (goOn) {
        const iframe = iframes.item(index);
        console.log('iframe[', index, '] --> ', iframe);
        if (iframe && iframe.hasAttribute('data-testid')) {
          console.log('found...');
          this.fbMessagerPopup = iframe;
          goOn = false;
        }
        if (!iframe) {
          goOn = false;
        } else {
          index++;
        }
      }
      console.log(this.fbMessagerPopup);
    }, 2000);
  }

  toggleMessenger() {
    console.log('className : ', typeof this.fbMessagerPopup.className);
    if (this.hidden) {
      // we display the element
      this.fbMessagerPopup.className = this.fbMessagerPopup.className.replace(' fb_customer_chat_bounce_out_v2', ' ');
      this.fbMessagerPopup.className += ' fb_customer_chat_bounce_in_v2';
      this.fbMessagerPopup.style.maxHeight = '100%';
    } else {
      // we hide the element
      this.fbMessagerPopup.className = this.fbMessagerPopup.className.replace(' fb_customer_chat_bounce_in_v2', ' ');
      this.fbMessagerPopup.className += ' fb_customer_chat_bounce_out_v2';
      this.fbMessagerPopup.style.maxHeight = '0px';
    }
    this.hidden = !this.hidden;
  }
}
