module.exports = {
  apps: [{
    name: 'pm2test',
    script: './app.js',
    combine_logs: true,
    merge_logs: true,
    // instances: 4,
    // instances: "max",
    watch: '../',
    // ignore_watch: [],
    // watch_options: ['./'],
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    out_file: "/Users/didi/files/software-files/pm2logs/pm2test/pm2/out.log",
    error_file: "/Users/didi/files/software-files/pm2logs/pm2test/pm2/error.log",
    pid_file: "/Users/didi/files/software-files/pm2logs/pm2test/pm2/pids",

    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
