namespace :scheduler do
  desc "This task is called by the Heroku cron add-on"
  task ping: :environment do
    uri = URI.parse('http://www.imagr.us/')
    Net::HTTP.get(uri)
  end
end
