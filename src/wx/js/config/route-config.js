export function configRouter(router) {
    // function view(name) {
    //     return function(resolve) {
    //         require([name], resolve);
    //     }
    // };

    router.map({
        'home': {
            component: function(resolve) {
                require(['../components/home.vue'], resolve);
            }
        },
        '/button': {
            component: function(resolve) {
                require(['../components/button.vue'], resolve);
            }
        },
        '/cell': {
            component: function(resolve) {
                require(['../components/cell.vue'], resolve);
            }
        },
        '/toast': {
            component: function(resolve) {
                require(['../components/toast.vue'], resolve);
            }
        },
        '/dialog': {
            component: function(resolve) {
                require(['../components/dialog.vue'], resolve);
            }
        },
        '/progress': {
            component: function(resolve) {
                require(['../components/progress.vue'], resolve);
            }
        },
        '/message': {
            component: function(resolve) {
                require(['../components/message.vue'], resolve);
            }
        },
        '/article': {
            component: function(resolve) {
                require(['../components/article.vue'], resolve);
            }
        },
        '/actionsheet': {
            component: function(resolve) {
                require(['../components/actionsheet.vue'], resolve);
            }
        },
        '/icons': {
            component: function(resolve) {
                require(['../components/icons.vue'], resolve);
            }
        },
        '/jssdk': {
            component: function(resolve) {
                require(['../components/jssdk.vue'], resolve);
            }
        },
        'about': {
            component: function(resolve) {
                require(['../components/about.vue'], resolve);
            }
        },
        'user/:userId': {
            component: function(resolve) {
                require(['../components/user/index.vue'], resolve);
            },
            subRoutes: {
                'profile/:something': {
                    component: function(resolve) {
                        require(['../components/user/profile.vue'], resolve);
                    }
                },
                'posts': {
                    component: function(resolve) {
                        require(['../components/user/posts.vue'], resolve);
                    }
                },
                'settings': {
                    component: function(resolve) {
                        require(['../components/user/settings.vue'], resolve);
                    }
                }
            }
        },
        'inbox': {
            component: function(resolve) {
                require(['../components/inbox/index.vue'], resolve);
            },
            subRoutes: {
                '/message/:messageId': {
                    component: function(resolve) {
                        require(['../components/inbox/message.vue'], resolve);
                    }
                },
                '/archived': {
                    component: function(resolve) {
                        require(['../components/inbox/archive.vue'], resolve);
                    }
                },
                '/': {
                    component: {
                        template: 'default yo'
                    }
                }
            }
        },
        '*': {
            component: function(resolve) {
                require(['../components/not-found.vue'], resolve);
            }
        },


    })

    router.redirect({
        'info': 'about',
        'hello/:userId': 'user/:userId'
    })

    router.beforeEach((transition) => {
        console.log(transition.to.path)
        if (transition.to.path === '/') {
            router.go('home')
        } else {
            if (transition.to.path === '/wx/forbidden') {
                router.app.authenticating = true
                setTimeout(() => {
                    router.app.authenticating = false
                    alert('this route is forbidden by a global before hook')
                    transition.abort()
                }, 3000)
            } else {
                transition.next()
            }
        }
    })
}
