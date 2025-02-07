<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\AndroidController;
use App\Http\Controllers\GatewayController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PlayerSettingController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\VideoController;

Route::any('/', [WelcomeController::class, 'welcome'])->name('welcome');
Route::any('/home', [WelcomeController::class, 'welcome'])->name('home');
Route::get('/search', [WelcomeController::class, 'search'])->name('search');
Route::get('page/{slug}', [WelcomeController::class, 'page'])->name('page');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

// Memberships
Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/watchlist', function () {
        return 'due';
    })->name('watchlist');

    Route::prefix('membership-plans')->group(function () {
        Route::post('{membership}/subscribe', [MembershipController::class, 'subscribe'])->name('memberships.subscribe');
        Route::post('{membership}/cancel', [MembershipController::class, 'cancel'])->name('memberships.cancel');
    });

    Route::post('/apply-coupon', [CouponController::class, 'applyCoupon'])->name('apply-coupon');
});

// Memberships
Route::get('membership-plans', [MembershipController::class, 'memberships'])->name('memberships');
Route::get('payment-methods/{id}', [MembershipController::class, 'paymentMethods'])->name('payment-methods')->middleware(['auth', 'role:user']);
Route::get('add-to-watchlist', [MembershipController::class, 'addToWatchlist'])->name('add-to-watchlist')->middleware(['auth', 'role:user']);
Route::get('/actors/{name}/{id}', [ActorController::class, 'details'])->name('actors.details');



// Videos
Route::get('video-details/{id}', [VideoController::class, 'details'])->name('video.details');
Route::get('video-watch/{id}', [VideoController::class, 'watch'])->name('video.watch')->middleware('isSubscribe');
Route::get('video', [VideoController::class, 'video'])->name('video');
Route::get('watchlist-add', [VideoController::class, 'watchlistAdd'])->name('watchlist.add');







Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('/', function () {
        if (Auth::check()) {
            return redirect(route('dashboard'));
        }
        return Inertia::render('Admin/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    });

    Route::middleware(['auth', 'role:admin'])->group(function () {
        // Clear Cache
        Route::any('clear-cache', function () {
            \Artisan::call('cache:clear');
            \Artisan::call('view:clear');
            \Artisan::call('route:clear');
            \Artisan::call('config:clear');

            echo 'done';
        })->name('clear-cache');

        Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');



        // Profile
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Language
        Route::any('languages/{id?}', [MasterController::class, 'languages'])->name('languages');
        Route::post('languages/{id?}', [MasterController::class, 'languageSave'])->name('languages.save');
        Route::post('languages/status/{id}', [MasterController::class, 'languageStatus'])->name('languages.status');

        // Genre
        Route::any('genres/{id?}', [MasterController::class, 'genres'])->name('genres');
        Route::post('genres/{id?}', [MasterController::class, 'genreSave'])->name('genres.save');
        Route::post('genres/status/{id}', [MasterController::class, 'genreStatus'])->name('genres.status');

        // Actor
        Route::any('actors/{id?}', [MasterController::class, 'actors'])->name('actors');
        Route::get('actors-create/{id?}', [MasterController::class, 'actorCreate'])->name('actors.create');
        Route::post('actors/{id?}', [MasterController::class, 'actorSave'])->name('actors.save');
        Route::post('actors-delete', [MasterController::class, 'actorDelete'])->name('actors.delete');

        // Director
        Route::any('directors/{id?}', [MasterController::class, 'directors'])->name('directors');
        Route::get('directors-create/{id?}', [MasterController::class, 'directorCreate'])->name('directors.create');
        Route::post('directors/{id?}', [MasterController::class, 'directorSave'])->name('directors.save');
        Route::post('directors-delete', [MasterController::class, 'directorDelete'])->name('directors.delete');

        // Home Slider
        Route::any('home-sliders/{id?}', [MasterController::class, 'homeSliders'])->name('home-sliders');
        Route::get('home-sliders-create/{id?}', [MasterController::class, 'directorCreate'])->name('home-sliders.create');
        Route::post('home-sliders/{id?}', [MasterController::class, 'directorSave'])->name('home-sliders.save');
        Route::post('home-sliders-delete', [MasterController::class, 'directorDelete'])->name('home-sliders.delete');

        // // Route::resource('actors', ActorController::class);
        // Route::get('actors', [ActorController::class, 'index'])->name('actors.index'); // Display a listing of the resource
        // Route::get('actors/create', [ActorController::class, 'create'])->name('actors.create'); // Show the form for creating a new resource
        // Route::post('actors', [ActorController::class, 'store'])->name('actors.store'); // Store a newly created resource in storage
        // Route::get('actors/{id?}', [ActorController::class, 'show'])->name('actors.show'); // Display the specified resource
        // Route::get('actors-edit/{id?}', [ActorController::class, 'edit'])->name('actors.edit'); // Show the form for editing the specified resource
        // Route::put('actors/{id?}', [ActorController::class, 'update'])->name('actors.update'); // Update the specified resource in storage
        // Route::delete('actors/{id?}', [ActorController::class, 'destroy'])->name('actors.destroy'); // Remove the specified resource from storage

        // Route::resource('directors', DirectorController::class);

        // Videos
        Route::get('videos', [VideoController::class, 'index'])->name('videos');
        Route::get('videos-create/{id?}', [VideoController::class, 'create'])->name('videos.create');
        Route::post('videos/{id?}', [VideoController::class, 'saveVideo'])->name('videos.save');
        Route::post('videos/delete-multiple', [VideoController::class, 'deleteMultiple'])->name('videos.deleteMultiple');
        Route::put('videos/status/{id}',  [VideoController::class, 'status'])->name('videos.status');
        Route::post('/videos/import-imdb', [VideoController::class, 'importFromImdb'])->name('videos.import_imdb');









        Route::prefix('home')->group(function () {
            // Route::resource('sliders', SliderController::class);
            Route::resource('sections', SectionController::class);
            Route::put('sections/status/{id}',  [SectionController::class, 'status'])->name('sections.status');
        });

        Route::resource('users', UserController::class);
        Route::get('deleted-users', [UserController::class, 'deletedUsers'])->name('users.deleted');
        Route::put('user-recovery/{id}', [UserController::class, 'usersRecovery'])->name('users.recovery');
        Route::post('users/delete/{id}', [UserController::class, 'deletedDelete'])->name('users.delete');

        // Route::resource('subscriptions', SubscriptionPlanController::class);

        // Subscriptions
        Route::any('/subscription-plans/{id?}', [MasterController::class, 'subscriptionPlans'])->name('subscription-plans');
        // Route::get('subscriptions-create/{id?}', [MasterController::class, 'subscriptionCreate'])->name('subscriptions.create');
        // Route::post('subscriptions/{id?}', [MasterController::class, 'subscriptionSave'])->name('actors.save');
        // Route::post('subscriptions/status/{id}', [MasterController::class, 'subscriptionStatus'])->name('subscriptions.status');

        // Coupons
        Route::get('coupons', [CouponController::class, 'coupons'])->name('coupons');
        Route::get('coupons-create/{id?}', [CouponController::class, 'create'])->name('coupons.create');
        Route::post('coupons/{id?}', [CouponController::class, 'saveCoupon'])->name('coupons.save');

        // Gateways
        Route::get('gateways', [GatewayController::class, 'gateways'])->name('gateways');
        Route::get('gateways-edit/{id?}', [GatewayController::class, 'edit'])->name('gateways.edit');
        Route::post('gateways/{id?}', [GatewayController::class, 'save'])->name('gateways.save');
        Route::post('gateways/check-unique', [GatewayController::class, 'checkUnique'])->name('gateways.checkUnique');
        Route::post('gateways/status/{id}',  [GatewayController::class, 'status'])->name('gateways.status');

        // Transactions
        Route::get('transactions', [TransactionController::class, 'transactions'])->name('transactions');
        Route::post('transactions/export', [TransactionController::class, 'export'])->name('transactions.export');

        // Pages
        Route::get('pages', [PageController::class, 'pages'])->name('pages');
        Route::post('pages/check-uniqueness/{id?}', [PageController::class, 'checkUniqueness'])->name('pages.checkUnique');
        Route::get('pages/create/{id?}', [PageController::class, 'create'])->name('pages.create');
        Route::post('pages/{id?}', [PageController::class, 'save'])->name('pages.save');

        Route::prefix('settings')->group(function () {
            // Player Settings
            Route::get('player', [PlayerSettingController::class, 'playerSetting'])->name('player-settings');
            Route::post('player/save', [PlayerSettingController::class, 'playerSettingSave'])->name('player-settings.save');
            Route::get('player-ad', [PlayerSettingController::class, 'playerAdSetting'])->name('player-ad-settings');
            Route::post('player-ad/save', [PlayerSettingController::class, 'playerAdSettingSave'])->name('player-ad-settings.save');

            // Settings
            Route::get('general', [SettingController::class, 'generalSetting'])->name('general-settings');
            Route::post('general', [SettingController::class, 'generalSettingSave'])->name('general-settings.save');

            // Smtp
            Route::get('smtp-email', [SettingController::class, 'smtp'])->name('smtp');
            Route::post('smtp-email', [SettingController::class, 'smtpSave'])->name('smtp.save');
            Route::post('smtp-test', [SettingController::class, 'smtpTest'])->name('smtp.test');

            // Social Login
            Route::get('social-login', [SettingController::class, 'socialLogin'])->name('social-login');
            Route::post('social-login-save', [SettingController::class, 'socialLoginSave'])->name('social-login.save');

            // Menu Settings
            Route::get('menu', [SettingController::class, 'menu'])->name('menu-settings');

            // Recaptcha Settings
            Route::get('recaptcha', [SettingController::class, 'recaptcha'])->name('recaptcha-settings');

            // Banner Ads Settings
            Route::get('banner-ad', [SettingController::class, 'bannerAd'])->name('banner-ad-settings');

            // Site Maintenance Settings
            Route::get('site-maintenance', [SettingController::class, 'siteMaintenance'])->name('site-maintenance');
            Route::post('site-maintenance', [SettingController::class, 'siteMaintenanceSave'])->name('site-maintenance.save');
            Route::post('change-maintenance-mode/{mode}', [SettingController::class, 'changeMaintenanceMode'])->name('maintenance-mode.change');
        });

        Route::prefix('android')->group(function () {
            Route::get('verify-purchase-app', [AndroidController::class, 'purchase'])->name('verify-purchase-app');
            Route::post('verify-purchase-app/{id?}', [AndroidController::class, 'purchaseSave'])->name('verify-purchase-app.save');
            Route::post('verify-purchase-app/check-unique', [AndroidController::class, 'checkUnique'])->name('verify-purchase-app.checkUnique');

            Route::get('settings', [AndroidController::class, 'androidSetting'])->name('android-setting');
            Route::post('settings', [AndroidController::class, 'androidSettingSave'])->name('android-setting.save');

            Route::get('android-ad-list', [AndroidController::class, 'androidAdList'])->name('android-ad-list');
            Route::get('android-ad-create/{id?}', [AndroidController::class, 'androidAdCreate'])->name('android-ad.create');
            Route::post('android-ad-save/{id?}', [AndroidController::class, 'androidAdListSave'])->name('android-ad.save');

            Route::get('android-notification', [AndroidController::class, 'androidNotification'])->name('android-notification');
        });

        // Route::get('/recaptcha_settings', [DashboardController::class, 'dashboard'])->name('admin.recaptcha_settings');
        // Route::get('/web_ads_settings', [DashboardController::class, 'dashboard'])->name('admin.web_banner_ad_settings');
        // Route::get('/site_maintenance', [DashboardController::class, 'dashboard'])->name('admin.site_maintenance_settings');
        // Route::get('/verify_purchase_app', [DashboardController::class, 'dashboard'])->name('admin.verify_purchase_app');
        Route::get('/android_settings', [DashboardController::class, 'dashboard'])->name('android_settings');
        Route::get('/android_notification', [DashboardController::class, 'dashboard'])->name('android_notification');
        Route::get('/ad_list', [DashboardController::class, 'dashboard'])->name('ad_list');
    });
});

// Route for the admin ----------------------------------

require __DIR__ . '/auth.php';

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//         'styling' => optional(GeneralSetting::first())->styling
//     ]);
// });
