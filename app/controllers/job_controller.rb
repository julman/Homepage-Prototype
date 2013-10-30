JobData = Struct.new(:total_count, :jobs)

class JobController < ApplicationController
	def search

		crit = Cb.job_search_criteria
		crit.location = params[:location]
		crit.keywords= params[:title]
		crit.pay_low = params[:salary]
		crit.specific_education = params[:education]
		crit.per_page = 100
		crit.exclude_national = 'true'
		crit.exclude_non_traditional_jobs = 'true'
		searchresults = crit.search()

		job_hashes = []

		searchresults.each do |job|
		  job_hash = {}
		  job.instance_variables.each do |v|
		    key = v.to_s.gsub('@', '')
		    job_hash[key] = job.method(key).call rescue nil
		  end
		  job_hashes << job_hash
    end

    job_stuff = JobData.new(searchresults.cb_response.total_count, job_hashes)

		render json: job_stuff
	end
end
