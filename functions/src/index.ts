import { initializeApp } from "firebase-admin";
import deleteImg from "./imgs/delete_img";
import onDeleteImg from "./imgs/on_delete_img";

initializeApp();

exports.deleteImg = deleteImg;
exports.onDeleteImg = onDeleteImg;
