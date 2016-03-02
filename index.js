var pageTypes = {
    CAROUSEL: 'carousel',
    EXAMPLE: 'example',
    IDLE: 'idle',
};

var pages = [
    ////////////////////////////////////////////////////////////////////////////////
    // Pages featured in carousel
    ////////////////////////////////////////////////////////////////////////////////
    {
       pageType: pageTypes.CAROUSEL,
       src: "http://grafana.issuu.com/dashboard/db/magma",
       title: "Magma Home"
    },
    {
        pageType: pageTypes.CAROUSEL,
        src: "http://grafana.issuu.com/dashboard/db/magma2",
        title: "Magma Home (2)"
     },
     {
        pageType: pageTypes.CAROUSEL,
        src: "http://grafana.issuu.com/dashboard/db/graphdb",
        title: "graphdb"
     },
     {
        pageType: pageTypes.CAROUSEL,
        src: "http://grafana.issuu.com/dashboard/db/thin-layer",
        title: "thin layer"
     },
     {
         pageType: pageTypes.CAROUSEL,
         src: "http://grafana.issuu.com/dashboard/db/login",
         title: "issuu login"
     },
     {
        pageType: pageTypes.CAROUSEL,
        src: "http://grafana.issuu.com/dashboard/db/clippings",
        title: "clippings"
     },
     {
        pageType: pageTypes.CAROUSEL,
        src: "http://grafana.issuu.com/dashboard/db/tokens",
        title: "Token distribution"
     },
    {
        pageType: pageTypes.CAROUSEL,
        src: "/templates/mixpanel_auth.html",
        title: "InDesign Authentication"
    },
    {
        pageType: pageTypes.CAROUSEL,
        src: "/templates/mixpanel_dls.html",
        title: "InDesign Downloads"
    },
    {
        pageType: pageTypes.CAROUSEL,
        src: "/templates/mixpanel_upls.html",
        title: "InDesign Uploads"
    },
    {
        pageType: pageTypes.CAROUSEL,
        src: "/templates/mixpanel_selectionss.html",
        title: "InDesign User Actions"
    },
    // {
    //     pageType: pageTypes.CAROUSEL,
    //     src: "/templates/release-notes.html",
    //     title: "Release notes"
    // },
    ////////////////////////////////////////////////////////////////////////////////
    // Example/development pages
    ////////////////////////////////////////////////////////////////////////////////
    {
        pageType: pageTypes.EXAMPLE,
        src: '/templates/example.html',
        title: 'Example page',
    },
    ////////////////////////////////////////////////////////////////////////////////
    // THIS IS A NICE PAGE
    ////////////////////////////////////////////////////////////////////////////////
    //{
    //    pageType: pageTypes.IDLE,
    //    src: "/templates/mixpanel_upsell.html",
    //    title: "Mixpanel: Upsell"
    //},
];


////////////////////////////////////////////////////////////////////////////////
// LocalStorage
////////////////////////////////////////////////////////////////////////////////

// Helper
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.href);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Store mixpanel api key + secret localstorage
var key = getParameterByName('api_key');
var secret = getParameterByName('api_secret');

// ** REALLY ** want to get the key and secret from the dropdown text box.
// var key = getElementById('api_key');
// var secret = getElementById('api_secret');

if (key) {
    localStorage.setItem('issuu_mixpanel_api_key', key);
}
if (secret) {
    localStorage.setItem('issuu_mixpanel_api_secret', secret);
}

// Set UI api key calues
$('.js-api-key').val(localStorage.getItem('issuu_mixpanel_api_key'));
$('.js-api-secret').val(localStorage.getItem('issuu_mixpanel_api_secret'));
// localStorage.clear();

////////////////////////////////////////////////////////////////////////////////
// Append content
////////////////////////////////////////////////////////////////////////////////

// Append menu links
pages.forEach(function(page, index) {
    var menuClasses = 'menu__link js-menu-link';

    if (index === 0) {
        menuClasses += ' isActive';
        $('.js-header-page-title').text(page.title);
    }

    var markup = '<div data-iframe-ref="' + page.src + '" class="' + menuClasses + '">' + page.title + '</div>';

    if (page.pageType === pageTypes.CAROUSEL) {
        $('.js-menu-carousel').append(markup);
    } else if (page.pageType === pageTypes.IDLE) {
        $('.js-menu-idle').append(markup);
    } else if (page.pageType === pageTypes.EXAMPLE) {
        $('.js-menu-examples').append(markup);
    }
});

// Append api key and secret to pages
pages.forEach(function(page, index) {
    var apiKey = localStorage.getItem('issuu_mixpanel_api_key');
    var apiSecret = localStorage.getItem('issuu_mixpanel_api_secret');
    var classes = index === 0 ? 'app__iframe js-iframe isActive' : 'app__iframe js-iframe';
    var iframe = document.createElement('iframe');
    iframe.src = page.src + '?api_key=' + apiKey + '&api_secret=' + apiSecret;
    iframe.setAttribute('data-ref', page.src);
    iframe.setAttribute('data-pagetype', page.pageType);
    iframe.className = classes;
    $('.js-pages').append(iframe);
});


////////////////////////////////////////////////////////////////////////////////
// Carousel management
////////////////////////////////////////////////////////////////////////////////

function startCarousel() {
    if (!$('.js-play-button').hasClass('isActive')) {
        $('.js-play-button').addClass('isActive');
        $('.js-progress-bar').css('animation-play-state', 'running');
        $('.js-pause-button').removeClass('isActive');
    }
}

function stopCarousel() {
    $('.js-progress-bar').css('animation-play-state', 'paused');
    $('.js-play-button').removeClass('isActive');
    $('.js-pause-button').addClass('isActive');
}


////////////////////////////////////////////////////////////////////////////////
// Change page
////////////////////////////////////////////////////////////////////////////////

function getNextCarouselPage() {
    return $('.js-iframe[data-pagetype="carousel"].isActive').next()[0]
        ? $('.js-iframe[data-pagetype="carousel"].isActive').next()
        : $('.js-iframe[data-pagetype="carousel"]').first();
}

function getPreviousCarouselPage() {
    console.log()
    return $('.js-iframe[data-pagetype="carousel"].isActive').prev()[0]
        ? $('.js-iframe[data-pagetype="carousel"].isActive').prev()
        : $('.js-iframe[data-pagetype="carousel"]').last();
}

function changePage(pageRef) {
    var $newPage = $('.js-iframe[data-ref="' + pageRef + '"]')
    var $newMenuLink = $('.js-menu-link[data-iframe-ref="' + pageRef + '"]');
    var $newSearchResultLink = $('.js-search-result-link[data-iframe-ref="' + pageRef + '"]');
    // menu links
    $('.js-menu-link.isActive').removeClass('isActive');
    $newMenuLink.addClass('isActive');
    // search result links
    $('.js-search-result-link.isActive').removeClass('isActive');
    $newSearchResultLink.addClass('isActive');
    // iframe
    $('.js-iframe.isActive').removeClass('isActive');
    $newPage.addClass('isActive');
    // header page title
    $('.js-header-page-title').text($newMenuLink.text());
}

function changeCarouselPage($page) {
    if ($page.attr('data-pagetype') === pageTypes.CAROUSEL) {
        changePage($page.attr('data-ref'));
    } else {
        var $assumedNext = $page.next()[0]
          ? $page.next()
          : $('.js-iframe').first();

        changeCarouselPage($assumedNext);
    }
}

function transtionBetweenPages() {
    $('.js-play-button').addClass('isActive');
    $('.js-progress-bar').addClass('run-animation');
    $('.js-progress-bar').one('webkitAnimationEnd', function(e) {
        changeCarouselPage(getNextCarouselPage());

        $('.js-progress-bar').removeClass('run-animation');
        $('.js-progress-bar').css('width', '0');

        setTimeout(function() {
            transtionBetweenPages();
        }, 0);
    });
}

transtionBetweenPages();


////////////////////////////////////////////////////////////////////////////////
// Key events
////////////////////////////////////////////////////////////////////////////////

$('.js-search').on('keyup', function(e) {
    var $activeItem = $('.js-search-result-link.isActive');
    $activeItem.removeClass('isActive');

    if (e.keyCode === 38) { // up
        var $nextItem = $activeItem.prev();
        if ($nextItem[0]) {
            $nextItem.addClass('isActive');
        } else {
            $('.js-search-result-link').last().addClass('isActive');
        }
    } else if (e.keyCode === 40) { // down
        var $nextItem = $activeItem.next();
        if ($nextItem[0]) {
            $nextItem.addClass('isActive');
        } else {
            $('.js-search-result-link').first().addClass('isActive');
        }
    } else if (e.keyCode === 13) { // enter
        $activeItem.click();
        $('.js-search-results').empty();
        $('.js-search-results').focusOut();
    } else {
        $('.js-search-results').empty();
        var value = $(this).val();

        if (value) {
            var f = new Fuse(pages, {
                keys: ['title']
            });
            var result = f.search(value);

            result.forEach(function(page, index) {
                var classes = index === 0 ? 'search-results__link js-search-result-link isActive' : 'search-results__link js-search-result-link';
                $('.js-search-results').append('<div data-iframe-ref="' + page.src + '" class="' + classes + '">' + page.title + '</div>');
            });
        }
    }
});

$('body').on('keydown', function(e) {
    if ($('.js-search').is(":focus")) {
        return;
    }

    if (e.keyCode === 39 || e.keyCode === 40) { // right or down
        stopCarousel();
        changeCarouselPage(getNextCarouselPage());
    } else if (e.keyCode === 37 || e.keyCode === 38) { // left or up
        stopCarousel();
        changeCarouselPage(getPreviousCarouselPage());
    } else if (e.keyCode === 32) { // space (stop/start carousel)
        if ($('.js-play-button').hasClass('isActive')) {
            stopCarousel();
        } else {
            startCarousel();
        }
    }
});


////////////////////////////////////////////////////////////////////////////////
// Click handlers
////////////////////////////////////////////////////////////////////////////////

// Change page when clicking menu links or following search results
$('body').on('click', '.js-menu-link, .js-search-result-link', function(e) {
    if (!$(this).hasClass('isActive')) {
        changePage($(this).attr('data-iframe-ref'));
    }
});

// Pause page transitions when interacting with the page
$('body').on('click', '.js-pause-button, .js-menu-link, .js-search-result-link', function() {
    stopCarousel();
});

$('.js-play-button').on('click', function() {
    startCarousel();
});

$('.js-navicon').on('click', function() {
    $(this).toggleClass('isActive');
    $('.js-sidebar').toggleClass('isVisible');
    $('.js-logo').toggleClass('isVisible');
});

$('.js-api-key-button').on('click', function() {
    $(this).toggleClass('isActive');
    $('.js-api').toggleClass('isActive');
});
