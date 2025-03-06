<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Auth/Login'))->name('home');

Route::get('/login', fn () => Inertia::render('Auth/Login'))->name('login');
Route::get('/register', fn () => Inertia::render('Auth/Register'))->name('signup');
Route::get('/profile', fn () => Inertia::render('Profile'))->name('profile');
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

Route::group(['prefix' => '/listing'], function () {
    Route::get('/featured', fn () => Inertia::render('List/Featured'))->name('list.featured');
    Route::get('/create', fn () => Inertia::render('List/Create'))->name('list.create');
    Route::get('/update/{id}', fn ($id) => Inertia::render('List/Update', ['id' => $id]))->name('list.update');
    Route::get('/{id}', fn ($id) => Inertia::render('List/Details', ['id' => $id]))->name('list.details');
});
