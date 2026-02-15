import { translations } from "../api/i18n.js";
import { Router } from "../modules/router.js";

export const PrivacyService = {
  show: (pageElement) => {
    const noticePage = Router.getLink(pageElement, "privacyNotice.html");
    
    Swal.fire({
      title: `🔒 ${translations["privacy-title"]}`,
      html: `
          <p style="text-align: left;">${translations["privacy-intro"]}</p>
          ${translations["privacy-body"]}
          <p>${translations["privacy-full-doc"]}
            <a href="${noticePage}" target="_blank">${translations["privacy-link"]}</a>
          </p>
      `,
      confirmButtonText: translations["privacy-close-btn"],
      confirmButtonColor: '#63addfff',
      background: '#023859',
      color: '#ffffff'
    });
  }
};