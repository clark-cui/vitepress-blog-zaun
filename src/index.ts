import github_img_src from './assets/github.svg';
import blog_img_src from './assets/blog.svg';
import note_img_src from './assets/note.svg';
import box_img_src from './assets/box.svg';
import birds from './resources/birds';

const github_img: any = document.querySelector('#github');
github_img.src = github_img_src;
const blog_img: any = document.querySelector('#blog');
blog_img.src = blog_img_src;
const note_img: any = document.querySelector('#note');
note_img.src = note_img_src;
const box_img: any = document.querySelector('#box');
box_img.src = box_img_src;

birds();
const loading: any = document.querySelector('.spinner ');
loading.style.display = 'none';
const home: any = document.querySelector('.home');
home.style.display = 'flex';
