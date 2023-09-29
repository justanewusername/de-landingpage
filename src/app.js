import "./styles/reset.pcss";
import "./styles/pallette.pcss";
import "./styles/fonts.pcss";
import "./styles/global.pcss";

import "./styles/main.pcss";
import "./styles/header.pcss";
import "./styles/footer.pcss";

import Popup from "./js/popUp";
import Form from "./js/form";
import { API_URL } from "./config";

const popup = new Popup("#js-send-msg-form", "#js-lets-talk-btn");

// action after form submiting
let onFormSubmit = () => {
    popup.hide();
    let successMsgPopup = new Popup("#js-success-message");
    successMsgPopup.show();
};

const form = new Form("#js-send-msg-form", onFormSubmit, `${API_URL}/posts`);
